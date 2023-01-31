//https://upload.wikimedia.org/wikipedia/commons/9/95/Cartoon_cloud.svg
//For this code to work well the starting color needs to be black. If your icon set isn't black you can prepend "brightness(0) saturate(100%)" to your filter property which will first turn the icon set to black.
//https://codepen.io/sosuke/pen/Pjoqqp
//https://stackoverflow.com/questions/42966641/how-to-transform-black-into-any-given-color-using-only-css-filters/43960991#43960991


import { useWindowDimension } from './WindowDimenion'
import React,{ useState, useEffect } from 'react'

const BgClouds = ({limit=100}) => {
    /*
        '#ffb1b1', (255,177,177), filter: invert(92%) sepia(54%) saturate(1971%) hue-rotate(290deg) brightness(99%) contrast(115%);
        '#ffd380', (255,211,128), filter: invert(88%) sepia(86%) saturate(475%) hue-rotate(313deg) brightness(100%) contrast(102%);
        '#fcfd76', (252,253,118), filter: invert(97%) sepia(11%) saturate(1972%) hue-rotate(1deg) brightness(108%) contrast(98%);
        '#a1fb86', (161,251,134), filter: invert(83%) sepia(78%) saturate(335%) hue-rotate(44deg) brightness(104%) contrast(97%);
        '#71b2fb', 	(113,178,251), filter: invert(64%) sepia(69%) saturate(1301%) hue-rotate(185deg) brightness(102%) contrast(97%);
     */
    const colors = [
        'invert(92%) sepia(54%) saturate(1971%) hue-rotate(290deg) brightness(99%) contrast(115%)',
        'invert(88%) sepia(86%) saturate(475%) hue-rotate(313deg) brightness(100%) contrast(102%)',
        'invert(97%) sepia(11%) saturate(1972%) hue-rotate(1deg) brightness(108%) contrast(98%)',
        'invert(83%) sepia(78%) saturate(335%) hue-rotate(44deg) brightness(104%) contrast(97%)',
        'invert(64%) sepia(69%) saturate(1301%) hue-rotate(185deg) brightness(102%) contrast(97%)'
    ]
    const [width, height] = useWindowDimension()
    const [clouds, setClouds] = useState([])

    useEffect(()=>{
        let cloudArray = []
        for(let i =0;i< limit;++i){
            const cloudHeight = Math.floor(0.1*height)+Math.floor(Math.random() * (height/limit))
            const cloudWidth = Math.floor(0.1*width)+Math.floor(Math.random() * (width/limit))
            const cloudColor = colors[Math.floor(Math.random() * colors.length)]

            let cloudStyle = {
                height: `${cloudHeight}px`,
                width: `${cloudWidth}px`,
                top: `${Math.floor(Math.random() * (height-cloudHeight))}px`,
                left: `${Math.floor(Math.random() * (width-cloudWidth))}px`,
                filter: 'brightness(0) saturate(100%) ' + cloudColor
        }

            cloudArray.push(React.createElement('img',{
                className: 'cloud',
                src: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Cartoon_cloud.svg', //host on server afterward
                style: cloudStyle
            }))
        }
        setClouds(cloudArray)
    }, [width, height])

    return React.createElement('div', {id:'bgClouds'}, ...clouds)
}

export default BgClouds
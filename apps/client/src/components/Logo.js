
const Logo = () => {
    const colors = [
        'invert(92%) sepia(54%) saturate(1971%) hue-rotate(290deg) brightness(99%) contrast(115%)',
        'invert(88%) sepia(86%) saturate(475%) hue-rotate(313deg) brightness(100%) contrast(102%)',
        'invert(97%) sepia(11%) saturate(1972%) hue-rotate(1deg) brightness(108%) contrast(98%)',
        'invert(83%) sepia(78%) saturate(335%) hue-rotate(44deg) brightness(104%) contrast(97%)',
        'invert(64%) sepia(69%) saturate(1301%) hue-rotate(185deg) brightness(102%) contrast(97%)'
    ]

    const cloudColor = colors[Math.floor(Math.random() * colors.length)]
    const cloudStyle={
        filter: 'brightness(0) saturate(100%) ' + cloudColor
    }

    return <div>
        <img src={require('../assets/animeLogo.svg').default} style={cloudStyle} />
    </div>
}

export default Logo
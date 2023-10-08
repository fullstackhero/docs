function DonateButton() {
    return (
        <a
            href="https://opencollective.com/webpack/donate"
            target="_blank"
            rel="noopener noreferrer" // Added for security
        >
            <img
                src="https://opencollective.com/webpack/donate/button@2x.png?color=blue"
                alt="Donate to Webpack"
                width={300}
            />
        </a>
    );
}

export { DonateButton };
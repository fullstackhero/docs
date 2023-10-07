

export const Logo = () => {
    return (
        <span className="gridContainer">
        <div className="gridItem"><img src="https://fullstackhero.net/images/navbar-logo.png" style={{ maxWidth: 45 }}></img></div>

            <div className="gridItem">
          <div style={{ fontSize: 25 }}>fullstack<b>hero</b></div>
        </div>
            <style jsx>{`
      span {
        padding: 0.5rem 0.5rem 0.5rem 0;
        mask-image: linear-gradient(
          60deg,
          black 25%,
          rgba(0, 0, 0, 0.2) 50%,
          black 75%
        );
        mask-size: 400%;
        mask-position: 0%;
      }
      span:hover {
        mask-position: 100%;
        transition: mask-position 1s ease, -webkit-mask-position 1s ease;
      }
    `}</style>
        </span >
    );
};
export default {
  logo: Logo,
  themeSwitch: {
    useOptions() {
      return {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      }
    }
  },
  docsRepositoryBase: 'https://github.com/fullstackhero/docs/tree/main',
    project: {
      link: 'https://github.com/fullstackhero'
    }
}
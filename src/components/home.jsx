export const Home = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="grey top-grey"></div>
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-5 intro-text center">
                <img src="./img/1.gif" className="img-border" alt="tent" />
              </div>
              <div className="col-md-7 intro-text center">
                <div className="main-content">
                  <div className="line">
                    <span></span>
                  </div>
                  {/* <strong className="bottom-line">__________</strong> */}
                  <div>
                    <p>
                      {props.data ? props.data.paragraph1.line1 : "Loading"}
                    </p>
                    <p>
                      {props.data ? props.data.paragraph1.line2 : "Loading"}
                    </p>
                    <p>
                      {props.data ? props.data.paragraph1.line3 : "Loading"}
                    </p>
                    <p>
                      {props.data ? props.data.paragraph1.line4 : "Loading"}
                    </p>
                  </div>
                  {/* <strong className="bottom-line">__________</strong> */}
                  <div className="line">
                    <span></span>
                  </div>
                  <div className="mint">
                    <p>50/50</p>
                    <button>Mint Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grey bottom-grey"></div>
      </div>
    </header>
  );
};

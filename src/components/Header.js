import WalletCardEthers from './WalletCardEthers';

export default function Header(props) {
  return (
      <div className="flex items-center justify-between px-4 py-6 sm:px-6">
        <div>
          <a href="/" className="flex">
            <span className="sr-only">Workflow</span>
            <img
              className="w-auto h-8 sm:h-10"
              src="./logo.png"
              alt=""
            />
          </a>
        </div>
          <div className="flex items-center">
              <WalletCardEthers
                  connectWalletHandler={props.connectWalletHandler}
                  connButtonText={props.connButtonText}
                  defaultAccount={props.defaultAccount}
              />
          </div>
      </div>
  )
}

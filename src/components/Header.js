import { Link } from "react-router-dom";
import WalletCardEthers from './WalletCardEthers';

const navigation = [
  { name: 'Your NFTs', href: '/' },
  { name: 'Mint NFTs', href: '/mint' },
]


export default function Header(props) {
  return (
          <header>
              <div className="flex items-center justify-between py-6">
                  <div className="flex flex-row items-center">
                    <Link to="/" className="flex">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="w-auto h-8 sm:h-10"
                        src="./logo.png"
                        alt=""
                      />
                    </Link>
                    {props.defaultAccount
                    ? <div className="hidden ml-10 space-x-8 lg:block">
                        {navigation.map((link) => (
                          <Link key={link.name} to={link.href} className="px-4 py-2 text-base font-medium text-gray-900 rounded-md hover:border hover:border-transparent hover:shadow-sm hover:bg-indigo-200">
                            {link.name}
                          </Link>
                        ))}
                    </div>
                    : ''
                    }
                  </div>
                  <div className="ml-10 space-x-4">
                      <WalletCardEthers
                          connectWalletHandler={props.connectWalletHandler}
                          connButtonText={props.connButtonText}
                          defaultAccount={props.defaultAccount}
                      />
                  </div>
              </div>
          </header>
  )
}

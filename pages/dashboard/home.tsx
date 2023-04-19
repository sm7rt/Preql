/* eslint-disable */
import Image from 'next/image';
import Link from 'next/link';
import DashboardWrapper from 'src/dashboard/wrapper';
import useWarehouse from 'src/home/hooks/useWarehouse';
import { useQueryMetrics } from 'src/hooks/useQueryMetrics';
import { useUserInfo } from 'src/hooks/useUserInfo';

function Home() {
  const userInfo = useUserInfo();
  const { data, isError } = useWarehouse();
  const { data: metricData } = useQueryMetrics();

  return (
    <DashboardWrapper>
      <div className="flex flex-col h-full">
        <div className="flex flex-row grow">
          <div className="basis-7/12 mr-8 flex flex-col">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-8">
              <div className="p-8">
                <h1 className="text-3xl text-gray-900 font-primary font-bold leading-snug">
                  👋 Hi, {userInfo ? userInfo.first_name : null}
                </h1>
                <p className="text-lg text-gray-500 mt-4 max-w-2xl">
                  Welcome to Preql - let’s get you set up.
                </p>
              </div>
            </div>

            <div className="overflow-hidden bg-white border shadow sm:rounded-lg flex flex-col p-8">
              <h1 className="text-2xl font-semibold text-left leading-normal text-[#19181A]">
                Your connections
              </h1>
              <hr className="w-full my-4" color="#EDF0F7" />
              <div className="overflow-hidden flex grow max-h-[calc(100vh-400px)] place-content-between ">
                <div className="flex flex-row w-5/12">
                  <div className="overflow-hidden bg-white border sm:rounded-lg flex flex-col p-4 border-[#CDD0E1]">
                    <div className="datasource-header flex flex-col items-center">
                      <h2 className="text-lg mb-1 font-semibold text-center leading-normal text-[#19181A]">
                        Your sources
                      </h2>
                      <p className="text-xs leading-normal text-center mb-4 text-[#2D3648]">
                        We&apos;ve connected to your snowflake warehouse and are
                        pulling data from:
                      </p>

                      <div
                        className={`rounded-full flex flex-row items-center justify-center mb-4 w-fit p-1 gap-2 ${
                          isError ? 'bg-rose-300' : 'bg-aquamarine-200'
                        }`}
                      >
                        <Image
                          alt="Logo"
                          height={28}
                          src="/icons/icon-snowflake.svg"
                          width={28}
                        />
                        <div className="uppercase text-xs text-center font-semibold leading-normal mr-1 text-[#2D3648]">
                          Snowflake
                        </div>
                        <Image
                          alt="check-circle"
                          height={19}
                          src={
                            isError
                              ? '/icons/icon-x-circle-rose.svg'
                              : '/icons/icon-check-green.svg'
                          }
                          width={19}
                        />
                      </div>
                    </div>

                    <hr className="w-full" color="#EDF0F7" />

                    <div className="datasource-content w-full">
                      <div className="bg-white flex flex-row items-center mb-4 p-1 gap-2 ">
                        <Image
                          alt="Logo"
                          height={28}
                          src="/icons/icon-shopify.svg"
                          width={28}
                        />
                        <div className="uppercase text-xs text-left leading-normal font-semibold grow text-[#2D3648]">
                          Shopify
                        </div>
                        <Image
                          alt="check-circle"
                          className="mr-1"
                          height={19}
                          src={
                            isError
                              ? '/icons/icon-x-circle-gray.svg'
                              : '/icons/icon-check-circle.svg'
                          }
                          width={19}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-[150px]">
                  <Image
                    src="/icons/icon-connection.svg"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
                <div className="flex flex-row w-5/12">
                  <div className="right-side-comp overflow-hidden grow bg-white border border-stone-300 sm:rounded-lg flex flex-col p-4">
                    <div className="metrics-header flex flex-col items-center">
                      <h2 className="text-lg mb-1 font-semibold text-center leading-normal text-purple-500">
                        ✨ Your metrics ✨
                      </h2>
                      <p className="text-xs leading-normal text-center mb-4 text-[#2D3648]">
                        We&apos;ve autogenerated these based on your data
                      </p>
                    </div>

                    <hr className="w-full" color="#EDF0F7" />

                    {!isError ? (
                      <>
                        <div className="metrics-content w-full flex flex-col items-center grow overflow-y-auto h-min relative">
                          <div className="sticky left-0 top-0 w-full from-white to-transparent bg-gradient-to-b h-4 text-white">
                            &nbsp;
                          </div>
                          {metricData &&
                            metricData.map((item) => (
                              <div
                                className="bg-[#EDF0F7] w-fit rounded-full font-semibold leading-normal font-purple-500 text-xs gap-64 mb-3 py-1 px-2 hover:bg-[#DEE1EA] active:bg-[#CED2D8] cursor-pointer text-center text-[#2D3648]"
                                key={item.id}
                              >
                                {item.display_name}
                              </div>
                            ))}
                          <div className="sticky bottom-0 left-0 w-full to-white from-transparent bg-gradient-to-b h-4 text-white">
                            &nbsp;
                          </div>
                        </div>
                        <hr className="w-full" color="#EDF0F7" />
                        <div className="metrics-footer flex justify-center items-center mt-4">
                          <div className="bg-purple-500 text-white text-sm py-2 px-3 font-bold rounded-md flex flex-row items-center cursor-pointer">
                            Customize them &nbsp;
                            <Image
                              src="/icons/icon-arrow-right.svg"
                              alt="Logo"
                              height={12}
                              width={12}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="metrics-content w-full flex flex-col justify-center items-center grow">
                        <div className="text-sm mt-1 text-bg-[#2D3648] text-center">
                          Something&apos;s up with the connection -
                          <Link href="/settings/team">
                            <span className="underline underline-offset-4 text-purple-500 cursor-pointer">
                              contact us
                            </span>
                          </Link>{' '}
                          so we can help you get it back up and running.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="basis-5/12 flex grow">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex grow">
              <div className="p-8 flex flex-col grow">
                <h1 className="text-gray-900 text-2xl font-poppins font-bold mb-4">
                  Here&apos;s what you missed
                </h1>
                <hr color="#EDF0F7" />
                <div className="flex flex-col justify-center items-center p-8 grow">
                  <div className="text-base font-semibold">
                    👀&nbsp;Nothing to see
                  </div>
                  <div className="text-sm mt-1 text-gray-500 text-center">
                    <Link href="/settings/team">
                      <span className="underline underline-offset-4 text-indigo-700 cursor-pointer">
                        Invite your colleagues
                      </span>
                    </Link>
                    to start getting updates on their activity.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}

export default Home;

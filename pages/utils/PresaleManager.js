// pages/utils/PresaleManager.js
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";
import SeedSale from '../homepageComponents/seedSale';
import { parseUnits, formatUnits } from 'ethers/lib/utils';
import presaleABI from '../../contracts/presaleABI.json';
import StableCoinABI from '../../contracts/StableCoinABI.json';


export default function PresaleManager() {
    const { address, isConnected } = useAccount();

    // --- Presale Data ---
    const {
        data: presaleData,
        isLoading: presaleIsLoading,
        isError: presaleIsError,
        error: presaleError
    } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI, // Use imported ABI
        functionName: "presale",
        args: [process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
        enabled: Boolean(address), // Only run when connected
    });
     useEffect(() => {
    if (presaleIsError) {
      console.error("Presale Data Read Error:", presaleError);
    }
  }, [presaleIsError, presaleError]);

    // --- User Vesting Data ---
    const {
        data: userVestingData,
        isLoading: userVestingIsLoading,
        isError: userVestingIsError,
        error: userVestingError
    } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI, // Use imported ABI
        functionName: "userVesting",
        args: [address, process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
        enabled: Boolean(address), // Only run when connected
    });
      useEffect(() => {
        if (userVestingIsError) {
            console.error("userVestingData error", userVestingError)
        }
    }, [userVestingIsError, userVestingError]);

    // --- USDT Contract Address ---
    const { data: usdtContractAddress, error: usdtAddressError } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI, // Use imported ABI.  Same ABI as presale, since it's a function *on* the presale contract.
        functionName: "USDTInterface",
        watch: false, // No need to watch the contract address itself
        enabled: Boolean(address) // Only fetch if connected
    });
    useEffect(() => {
        if (usdtAddressError) {
            console.error("USDT address error:", usdtAddressError)
        }
    }, [usdtAddressError]);


    // --- Buy with USDT ---
    const [tokens, setTokens] = useState("10000"); // Default to a string, for input handling
    const [usdt, setUsdt] = useState(0);

    // Calculate USDT equivalent
    useEffect(() => {
        if (!presaleData || !tokens) {
            setUsdt(0);
            return;
        }
        // Handle potential errors during calculation
        try {
            // Ensure presaleData is available and has the expected structure.
            // The presale data is returned as an array.  The price is at index 3.
            const price = BigInt(presaleData[3]);  // Get price (as a BigInt)
            const tokenAmount = BigInt(parseUnits(tokens, 18)); // Convert input to BigInt
            const usdtValue = Number(formatUnits(tokenAmount * price, 18)); // Calculate and format for display
            setUsdt(usdtValue);

        } catch (error) {
            console.error("Error calculating USDT value:", error);
            setUsdt(0);  // Set to 0 on error
        }
    }, [presaleData, tokens]);

    // --- USDT Allowance ---
      const {
        data: accountAllowance,
        isLoading: accountAllowanceIsLoading,
        isError: accountAllowanceIsError,
        error: accountAllowanceError
    } = useContractRead({
        address: usdtContractAddress,  // Correct address: the USDT contract
        abi: StableCoinABIABI, // Use imported ABI
        functionName: "allowance",
        args: [address, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS],
        watch: true,
        enabled: Boolean(address && usdtContractAddress), // Only run when connected AND we have the USDT address
    });
    useEffect(() => {
        if (accountAllowanceError) {
          console.error("allowance error: ", accountAllowanceError)
        }
    }, [accountAllowanceError]);

    // --- USDT Buy Helper (for required allowance) ---
      const { data: usdtAllowanceNeeded, error: usdtAllowanceNeededError } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI, // Use imported ABI
        functionName: "usdtBuyHelper",
        args: [process.env.NEXT_PUBLIC_PRESALE_ID, tokens ? parseUnits(tokens, 18) : "0"],  // IMPORTANT: Convert to wei, handle empty string
        watch: true,
        enabled: Boolean(address),
    });
    useEffect(() => {
        if (usdtAllowanceNeededError) {
            console.error("usdtAllowanceNeededError error: ", usdtAllowanceNeededError)
        }
    }, [usdtAllowanceNeededError])

    // --- Approve USDT ---
    const { config: approveConfig } = usePrepareContractWrite({
        address: usdtContractAddress, // Correct address: the USDT contract
        abi: StableCoinABI,  // Use the imported USDT ABI
        functionName: 'approve',
        args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, usdtAllowanceNeeded ? String(usdtAllowanceNeeded) : "0"], // Convert to BigInt
        enabled: Boolean(address && usdtContractAddress && usdtAllowanceNeeded && BigInt(accountAllowance?.toString() || 0) < BigInt(usdtAllowanceNeeded || 0)),
    });
    const {
        data: approveData,
        isLoading: approveIsLoading,
        isSuccess: approveIsSuccess,
        isError: approveIsError,
        write: approveWrite,
        error: approveError,
        reset: approveReset // Add reset function
    } = useContractWrite(approveConfig || {}); // Add || {} for safety


    // --- Buy With USDT (Prepared) ---
    const { config: buyWithUsdtConfig, error: buyWithUsdtPrepareError,
        isError: buyWithUsdtIsPrepareError, } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI,
        functionName: 'buyWithUSDT',
        args: [process.env.NEXT_PUBLIC_PRESALE_ID, tokens ? parseUnits(tokens, 18): "0"], // Convert input to correct units
        enabled: Boolean(address && tokens && BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded || 0)), // Only enabled if connected AND allowance is sufficient
    });
    useEffect(() => {
        if (buyWithUsdtPrepareError) {
            console.error("usdt buy prepare error: ", buyWithUsdtPrepareError)
        }
    }, [buyWithUsdtPrepareError])

    const {
        data: buyWithUsdtData,
        isLoading: buyWithUsdtIsLoading,
        isSuccess: buyWithUsdtIsSuccess,
        isError: buyWithUsdtIsError,
        error: buyWithUsdtError,
        write: buyWithUsdtWrite,
        reset: buyWithUsdtReset // Add reset
    } = useContractWrite(buyWithUsdtConfig || {}); // Add || {} for safety.

    // --- Wait for Transactions ---
    const { isLoading: approveWaitLoading, isSuccess: approveWaitSuccess, error: approveWaitError } = useWaitForTransaction({
        hash: approveData?.hash,
    });

    const { isLoading: buyWaitLoading, isSuccess: buyWaitSuccess, error: buyWaitError } = useWaitForTransaction({
        hash: buyWithUsdtData?.hash,
    });
      // --- Effects ---
    // Reset on success and error
    useEffect(() => {
        if (approveWaitSuccess) {
            approveReset(); // Clear approval data
        }
    },[approveWaitSuccess, approveReset])

    useEffect(() => {
        if (buyWaitSuccess) {
            buyWithUsdtReset();
            setTokens(''); // Clear the input
        }
    }, [buyWaitSuccess, buyWithUsdtReset]);

    //Render helper for the presale data.
    function renderPresaleData()
    {
        if(!presaleData) return null;
        const [
            saleToken,
            startTime,
            endTime,
            price,
            tokensToSell,
            baseDecimals,
            inSale,
            vestingStartTime,
            vestingCliff,
            vestingPeriod,
            enableBuyWithEth,
            enableBuyWithUsdt
        ] = presaleData;

            return (
                <>
                    <p>Sale Token: {saleToken}</p>
                    <p>startTime: {new Date(Number(startTime) * 1000).toLocaleString("default")}</p>
                    <p>endTime: {new Date(Number(endTime) * 1000).toLocaleString("default")}</p>
                    <p>price: {Number(formatUnits(BigInt(price), 18)).toFixed(3)}$ per Token</p>
                    <p>tokensToSell: {Number(formatUnits(BigInt(tokensToSell),0)).toLocaleString()} Token</p>
                    <p>inSale: {Number(formatUnits(BigInt(inSale),0)).toLocaleString()} Token</p>
                    <p>tokensSold: {Number(formatUnits((BigInt(tokensToSell) - BigInt(inSale)),0)).toLocaleString()} Token</p>
                    <p>presaleGoal: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(formatUnits(BigInt(tokensToSell) * BigInt(price), 18)))} $</p>
                    <p>baseDecimals: {baseDecimals}</p>
                    <p>vestingStartTime: {new Date(Number(vestingStartTime) * 1000).toLocaleString("default")}</p>
                    <p>vestingCliff: {vestingCliff}</p>
                    <p>vestingPeriod: {vestingPeriod}</p>
                    <p>enableBuyWithEth: {enableBuyWithEth.toString()}</p>
                    <p>enableBuyWithUsdt: {enableBuyWithUsdt.toString()}</p>
                </>
            )
    }

    //Render helper for the user vesting data.
    function renderUserVestingData()
    {
        if(!userVestingData) return null;
        const [totalAmount, claimedAmount, claimStart, claimEnd] = userVestingData;
        return (
            <>
                <p>totalAmount: {Number(formatUnits(BigInt(totalAmount), 18)).toLocaleString()} Token</p>
                <p>claimedAmount: {Number(formatUnits(BigInt(claimedAmount),18)).toLocaleString()} Token</p>
                <p>claimStart: {new Date(Number(claimStart) * 1000).toLocaleString("default")}</p>
                <p>claimEnd: {new Date(Number(claimEnd) * 1000).toLocaleString("default")}</p>
            </>
        )
    }

    const renderContent = () => {
    return (
        <>
            <section className="parallaxOne" data-parallax="scroll" data-image-src="images/bg/20.jpg" data-bleed="10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="chooseUsContent home_page3">
                                <h3 className="magenta normal">Purchase Aigos PreSale Token:</h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded || 0)) {
                                          buyWithUsdtWrite?.();
                                      } else {
                                        approveWrite?.();
                                      }
                                    }}>
                                    <label htmlFor="tokenId">Amount of Token</label>
                                    <input
                                        type="text" // Use text input!
                                        placeholder="Amount of Token"
                                        className="exchange__textBox"
                                        value={tokens}
                                        onChange={(e) => setTokens(e.target.value)}
                                    />
                                    <div>USDT equivalent: {usdt.toFixed(2)}</div>
                                    <button disabled={approveIsLoading || buyWithUsdtIsLoading || approveWaitLoading || buyWaitLoading}>
                                    {approveIsLoading || approveWaitLoading
                                      ? 'Approving USDT...'
                                      : buyWithUsdtIsLoading || buyWaitLoading
                                        ? 'Buying Tokens...'
                                        : BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded || 0) ? 'Buy Tokens' : 'Approve USDT'}
                                    </button>
                                    {approveIsSuccess && (
                                      <div>
                                        USDT Approved!
                                      </div>
                                    )}
                                    {buyWithUsdtIsSuccess && (
                                        <div>
                                            Successfully bought AIGOS!
                                            <div>
                                                <a href={`https://testnet.bscscan.com/tx/${buyWithUsdtData?.hash}`}>Bscscan</a>
                                            </div>
                                        </div>
                                    )}
                                     {approveIsError && (
                                      <div><b>Approve Error:</b> {approveError?.message}</div>
                                     )}
                                     {buyWithUsdtIsError && (
                                          <div><b>Buy Error:</b> {buyWithUsdtError?.message}</div>
                                     )}
                                    {presaleIsError && (
                                      <div className="text-red-500">Error loading presale data: {presaleError?.message}</div>
                                    )}
                                    {userVestingIsError && (
                                      <div className="text-red-500">Error loading user vesting data: {userVestingError?.message}</div>
                                    )}
                                      {usdtBalanceIsError && (
                                        <div className="text-red-500">Error loading user usdt balance: {usdtBalanceError?.message}</div>
                                    )}
                                    {accountAllowanceIsError && (
                                         <div><b>Allowance Error:</b> {accountAllowanceError?.message}</div>
                                    )}

                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="chooseUsContent home_page3">
                                <h3 className="magenta normal">User Vesting Data:</h3>
                                        {userVestingIsLoading ? (
                                    <p>Loading user vesting data...</p>
                                ) : (
                                  renderUserVestingData()
                                )}
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="chooseUsContent home_page3">
                                <h3 className="magenta normal">Presale Data:</h3>
                                {presaleIsLoading ? (
                                    <p>Loading presale data...</p>
                                ) : (
                                  renderPresaleData()
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

return (
    <>
    <SeedSale usdt={usdt} waitForTransactionIsSuccess={buyWaitSuccess} />
        {renderContent()}
    </>
)
}
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";

export default function PresaleData() {
    const [presaleDataParsed, setPresaleDataParsed] = useState(null);

    /**
     * @fn Log
     * @brief Log to console
     */
    function Log(stringToLog) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        console.log(today.toUTCString() + " | " + stringToLog);
    }

    /* Presale Data */
    const { data: presaleData,
        error: presaleDataError,
        isError: presaleIsError,
        isLoading: presaleIsLoading,
        status: presaleStatus } = useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString(),
            abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
            functionName: "presale",
            args: [process.env.NEXT_PUBLIC_PRESALE_ID],
            watch: false,
        });

    /* Wallet Connected / Disconnected */
    useEffect(() => {
        Log("----------> Pre-render: Initializing...");

        Log("----------> presaleData: " + presaleData);
        Log("----------> presaleDataError: " + presaleDataError);
        Log("----------> presaleIsError: " + presaleIsError);
        Log("----------> presaleIsLoading: " + presaleIsLoading);
        Log("----------> presaleStatus: " + presaleStatus);

        if (presaleData) {
            printPresaleData(presaleData);
        }
    }, [presaleData, presaleDataError, presaleIsError, presaleIsLoading, presaleStatus]);

    /**
     * @class Presale
     * @brief Presale Data
     */
    class Presale {
        constructor(presaleData) {
            this.preSaleDataLocal = presaleData;
            if (this.preSaleDataLocal) {
                var presaleSplit = presaleData.toString().split(",");
                var counter = 0;
                this.saleToken = presaleSplit[counter++];
                this.startTime = new Date(presaleSplit[counter++] * 1000);
                this.endTime = new Date(presaleSplit[counter++] * 1000);
                this.price = (presaleSplit[counter++] / (10 ** 18));
                this.tokensToSell = presaleSplit[counter++];
                this.presaleGoal = this.tokensToSell * this.price;
                this.baseDecimals = presaleSplit[counter++];
                this.inSale = presaleSplit[counter++];
                this.tokensSold = this.tokensToSell - this.inSale;
                this.vestingStartTime = new Date(presaleSplit[counter++] * 1000);
                this.vestingCliff = presaleSplit[counter++];
                this.vestingPeriod = presaleSplit[counter++];
                this.enableBuyWithEth = Boolean(parseInt(presaleSplit[counter++]));
                this.enableBuyWithUsdt = Boolean(parseInt(presaleSplit[counter++]));
            }
        }

        get HtmlOutput() {
            if (this.preSaleDataLocal) {
                return (
                    <>
                        <p>Sale Token: {this.saleToken}</p>
                        <p>startTime: {this.startTime.toLocaleString("default")}</p>
                        <p>endTime: {this.endTime.toLocaleString("default")}</p>
                        <p>price: {this.price.toFixed(3)}$ per Token</p>
                        <p>tokensToSell: {new Intl.NumberFormat().format(this.tokensToSell)} Token</p>
                        <p>inSale: {new Intl.NumberFormat().format(this.inSale)} Token</p>
                        <p>tokensSold: {new Intl.NumberFormat().format(this.tokensSold)} Token</p>
                        <p>presaleGoal: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(this.presaleGoal)} $</p>
                        <p>baseDecimals: {this.baseDecimals}</p>
                        <p>vestingStartTime: {this.vestingStartTime.toLocaleString("default")}</p>
                        <p>vestingCliff: {this.vestingCliff}</p>
                        <p>vestingPeriod: {this.vestingPeriod}</p>
                        <p>enableBuyWithEth: {this.enableBuyWithEth.toString()}</p>
                        <p>enableBuyWithUsdt: {this.enableBuyWithUsdt.toString()}</p>
                    </>
                )
            } else return (<></>);
        }
    }

    /**
     * @fn printPresaleData
     * @brief Print Presale Data
     */
    function printPresaleData(presaleData) {
        var preSale = new Presale(presaleData);
        setPresaleDataParsed(preSale.HtmlOutput);
    }

    const renderContent = () => {
        return (
            <>
                <h3 className="magenta normal">Presale Data:</h3>
                <div>{presaleDataParsed}</div>
            </>
        );
    };

    return (
        <>
            {renderContent()}
        </>
    )
}

import React, {useEffect, useState} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";

const Pay = () => {

    const { scanResult, setScanResult} = useState(null);

    useEffect(()=> {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 500,
                height: 500,
            },
            fps: 5
        });
    
        scanner.render(success, error);
    
        function success(result){
           scanner.clear();
           setScanResult(result);
        };
        
        function error(err){
            console.warn(err);
    
    
        };

    }, []);


    return (
        <>
        <h1> Escanea el codigo qr para hacer pagos</h1>
        { scanResult
            ? <div> Success: <a href={"https://"+scanResult}> {scanResult} </a></div>
            : <div id="reader"> </div>
        
        }

        </>
    );


};


export default Pay;
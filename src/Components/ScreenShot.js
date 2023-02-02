import html2canvas from 'html2canvas';
import {Nav} from "react-bootstrap";
import {screen} from "@testing-library/react";

export default function ScreenShot(props) {

    const handleScreenShot = (bool) => {
        ;
        props.handleScreenShot(bool);
    }


    const takeScreenShot = async () => {
        await handleScreenShot(true);
        const body = document.querySelector("#capture")
        html2canvas(body, {
            windowWidth: body.scrollWidth,
            windowHeight: screen.availHeight
        }).then(canvas => {
            const a = document.createElement("a");
            a.href = canvas.toDataURL();
            a.download = "screenshot.jpg";
            a.click();
        })
        await handleScreenShot(false);
    }

    return (
        <Nav.Link onClick={takeScreenShot}><h4>Export</h4></Nav.Link>
    );
}
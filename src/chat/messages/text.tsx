import { h, Component } from "preact";
import MessageType from "./messagetype";
import { IMessageTypeProps } from "../../typings";

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }
};
export default class TextType extends MessageType {
    render(props: IMessageTypeProps) {
        const message = props.message;
        const attachment = message.attachment;

        const textObject = { __html: message.text };
        // console.log(message.text, textObject);

        return (
            <div style={styles}>
                <p style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={textObject} />

                {attachment && attachment.type === "image" ? (
                    <img src={attachment.url} style="max-width: 100%;"  alt={''}/>
                ) : (
                    ""
                )}
                {attachment && attachment.type === "audio" ? (
                    <audio controls autoPlay={false} style="max-width: 100%;">
                        <source src={attachment.url} type="audio/mp3" />
                    </audio>
                ) : (
                    ""
                )}
                {attachment && attachment.type === "video" ? (
                    <video
                        height={props.conf.videoHeight}
                        controls
                        autoPlay={false}
                        style="max-width: 100%;"
                    >
                        <source src={attachment.url} type="video/mp4" />
                    </video>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

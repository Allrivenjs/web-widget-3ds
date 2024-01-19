import {h} from "preact";
import MessageType from "./messagetype";
import {IMessage, IMessageTypeProps} from "../../typings";
import {LinkInfo} from "../LinkInfo";
import * as renderToString  from 'preact-render-to-string';

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
        const passToLinks = (message: IMessage) => {
            const texto = message.text;
            let data_links = message.additionalParameters;
            if (data_links && data_links['link_data']){
                data_links = data_links['link_data'];
                const html = renderToString.render(LinkInfo({linkData: data_links}));
                console.log(html);
            }

            return texto;
        };
        // const expresionRegularEnlace = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi;
        // const enlacesEncontrados = texto.match(expresionRegularEnlace);
        //
        // if (enlacesEncontrados) {
        //     return texto.replace(expresionRegularEnlace, (enlace) => {
        //         return `<a href="${enlace}" target="_blank"
        //                      class="link"
        //                     >Click Me</a>`;
        //     });
        // }
        //
        // return texto;
        const textObject = { __html: passToLinks(message) };

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

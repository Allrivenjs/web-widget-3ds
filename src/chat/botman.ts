import axios from 'axios';
import { IAttachment, IMessage } from './../typings';

class BotMan {

	userId: string;
	chatServer: string;
    tokenJWT: string;

    setUserId(userId: string) {
        this.userId = userId;
    }

    setChatServer(chatServer: string) {
        this.chatServer = chatServer;
    }

    setTokenJWT(tokenJWT: string){
        this.tokenJWT = tokenJWT;
    }

    callAPI = (text: string, interactive = false, attachment: IAttachment = null, perMessageCallback: Function, callback: Function) => {
    	let data = new FormData();
    	const postData: { [index: string] : string|Blob } = {
    		driver: 'web',
    		userId: this.userId,
    		message: text,
    		attachment: attachment as Blob,
    		interactive: interactive ? '1' : '0',
            token: this.tokenJWT
    	};

    	Object.keys(postData).forEach(key => data.append(key, postData[key]));

    	axios.post(this.chatServer, data).then(response => {
    		const messages = response.data.messages || [];

			if (perMessageCallback) {
				messages.forEach((msg: IMessage) => {
					perMessageCallback(msg);
				});
			}
            // console.log(response.data)
    		if (callback) {
    			callback(response.data);
    		}
    	});
    };

}

export let botman = new BotMan();

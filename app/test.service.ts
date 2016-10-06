import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';


@Injectable()
export class TestService {
    constructor(private http: Http){
        
    }
    botFrameworkDirectLineApiKey:string = '';
    conversationSession: any;

    initiateConversation() {
if (!this.conversationSession){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization','BotConnector ' + botFrameworkDirectLineApiKey);
var service = this;

        this.conversationSession = new Promise(function(resolve,reject){

            service.http.post('https://directline.botframework.com/api/conversations', {} ,{ headers: headers })
                .map(res => res.json())
                .subscribe(
                data => resolve(data),
                err => reject(err),
                () => console.log('bot session initiated')
                ); 
            
        });
}

        return this.conversationSession;
    }

    postMessage(message:string) {
        var service = this;

        var promise = new Promise(function(resolve,reject) {
        service.initiateConversation().then(function(session) {
            console.log('session');
            console.log( session);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization','BotConnector ' + botFrameworkDirectLineApiKey);

            service.http.post('https://directline.botframework.com/api/conversations/' + session.conversationId + '/messages', 
            JSON.stringify({ text: message }) ,{ headers: headers })
                //.map(res => res.json())
                .subscribe(
                data => resolve({}),
                err => reject(err),
                () => console.log('bot session initiated')
                ); 
        });


        });
        return promise;
    }

    getMessages() {
                var service = this;

        var promise = new Promise(function(resolve,reject) {
        service.initiateConversation().then(function(session) {
            console.log('session');
            console.log( session);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization','BotConnector ' + botFrameworkDirectLineApiKey);

            service.http.get('https://directline.botframework.com/api/conversations/' + session.conversationId + '/messages', 
           { headers: headers })
                .map(res => res.json())
                .subscribe(
                data => resolve(data),
                err => reject(err),
                () => console.log('bot session initiated')
                ); 
        });


        });
        return promise;
    }
}
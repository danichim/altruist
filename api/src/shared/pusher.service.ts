import { Injectable } from "@nestjs/common";

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '989103',
  key: 'f0c10929e8a74f9924be',
  secret: '182658d300ae4eeb629e',
  cluster: 'eu',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});

@Injectable()
export class PusherService {
  pusher: any;

  constructor() {
    this.pusher = new Pusher({
      appId: '989103',
      key: 'f0c10929e8a74f9924be',
      secret: '182658d300ae4eeb629e',
      cluster: 'eu',
      encrypted: true
    });
  }

  sendNotification(userId, message) {
    this.pusher.trigger(userId, 'all', {
      "message": message
    });
  }
}

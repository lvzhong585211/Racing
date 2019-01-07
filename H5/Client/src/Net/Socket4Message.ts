// 引用 protobufjs
/// <reference path="../../libs/node_modules/protobufjs.d.ts" />

namespace Net {

    /**
     * 封装用于消息包接收与发送的 WebSocket
     */
    export class Socket4Message {
        private socket: Laya.Socket = new Laya.Socket();
        private eventDispatcher: laya.events.EventDispatcher = new laya.events.EventDispatcher();   // 接收消息的事件派发

        constructor() {
            if (Global.VersionInfo.development)
                this.socket.timeout = 0;       // 一直等待连接
            else
                this.socket.timeout = 3000;    // 等待3秒连接
        }

        /**
         * <p>连接到指定的服务端 WebSocket URL。 URL 类似 ws://yourdomain:port。</p>
         * <p>连接成功派发 Event.OPEN 事件；连接失败派发 Event.ERROR 事件；连接被关闭派发 Event.CLOSE 事件；接收到数据派发 Event.MESSAGE 事件； 除了 Event.MESSAGE 事件参数为数据内容，其他事件参数都是原生的 HTML DOM Event 对象。</p>
         * @param url	要连接的服务端 WebSocket URL。 URL 类似 ws://yourdomain:port。
         */
        public async connectByUrl(url: string): Promise<Boolean> {
            return new Promise<Boolean>((resolve) => {
                // 构造加载资源完成的回调函数. retData的具体内容见 Laya.loader.load() 中的说明
                const timeOutFun = () => {
                    this.socket.close();
                    resolve(false);
                };

                const connectSuccessFun = () => {
                    // 移除定时器
                    if (this.socket.timeout > 0)
                        Laya.timer.clear(this, timeOutFun);
                    resolve(true);
                };

                const connectFailedFun = () => {
                    // 移除定时器
                    if (this.socket.timeout > 0)
                        Laya.timer.clear(this, timeOutFun);
                    resolve(false);
                };

                this.socket.on(Laya.Event.OPEN, this, connectSuccessFun);
                this.socket.on(Laya.Event.ERROR, this, connectFailedFun);
                this.socket.on(Laya.Event.MESSAGE, this, this.onMessage);
                this.socket.on(Laya.Event.CLOSE, this, this.onClose);
                this.socket.connectByUrl(url);

                if (this.socket.timeout > 0) {
                    // 如果指定了超时时间,则等待
                    Laya.timer.once(this.socket.timeout, this, timeOutFun);
                }
            });
        }

        private mRecvCount = 0; // 接收消息的计数
        /**
         * 接收消息处理
         * @param msgData 收到的来自服务器的消息数据
         */
        private onMessage(msgData: any) {
            const pbReader = protobuf.Reader.create(new Uint8Array(msgData));

            // 读取消息类型
            const msgType = pbReader.uint32();

            // 输出消息日志
            if (EMessageType[msgType]) {
                switch (msgType) {
                    case EMessageType.CMD_SPR_MOVE:     // 移动消息
                    case EMessageType.CMD_SPR_POSITION: // 位置同步消息
                        break; // 某些频繁的消息不打印，防止刷屏输出
                    default:
                        Global.Log.Info(`%c <<==== | ${this.mRecvCount++} | ${EMessageType[msgType]}(${msgType})`, "color:blue");  // 打印收到的服务器消息
                        break;
                }
            }
            else {
                Global.Log.Warn(`%c <<==== | ${this.mRecvCount++} | 来自服务器的消息没有处理(msgType = ${msgType}) `, "color:darkblue");
                return;
            }

            // 派发消息
            this.eventDispatcher.event(EMessageType[msgType], pbReader);

            // 派发给默认的消息处理
            this.eventDispatcher.event(EMessageType[EMessageType.CMD_SOCKET_DEFAULT], [msgType, pbReader]);
        }

        /**
         * WebSocket 断开连接时调用
         */
        private onClose() {
            this.eventDispatcher.event(EMessageType[EMessageType.CMD_SOCKET_DISCONNECT]);
        }

        private mSendCount = 0; // 发送消息的计数

        /**
         * @desc 发送消息包到服务器
         * @param msgType 指定消息类型
         * @param msgObject 指定消息包的数据对象
         * @param encode 可以传入编码函数,一般为 T 数据类型的 encode() 函数
         */
        public sendData<T>(msgType: EMessageType, msgObject: T, encode?: { (msgObject: T, writer: protobuf.Writer): protobuf.Writer }) {
            const pbWriter = protobuf.Writer.create();

            // 输出消息信息,方便调试
            switch (msgType) {
                case EMessageType.CMD_SPR_POSITION: // 位置同步消息
                    break; // 某些频繁的消息不打印，防止刷屏输出
                default:
                    Global.Log.Info(`%c ====>> | ${this.mSendCount++} | ${EMessageType[msgType]}(${msgType})`, "color:red");
            }

            // 写入消息Id
            pbWriter.int32(msgType);

            if (!encode)
                encode = msgObject.constructor["encode"];       // 没有传入编码函数,则默认取 encode 函数.取不到的话表示传入错误了.

            // 写入消息数据
            const encodedData = encode(msgObject, pbWriter).finish();
            this.socket.send(encodedData);
        }

        /**
         * 直接发送一个对象的数组
         * @param msgType 指定要发送的对象的类型
         * @param msgObjectArray 指定要发送的对象的数组
         * @param encode 指定对象的打包函数
         */
        public sendDataArray<T>(msgType: EMessageType, msgObjectArray: T[], encode?: { (msgObject: T, writer: protobuf.Writer): protobuf.Writer }) {
            const pbWriter = protobuf.Writer.create();

            Global.Log.Info(`%c ====>> | ${this.mSendCount++} | ${EMessageType[msgType]}(${msgType})`, "color:red");

            // 写入消息Id
            pbWriter.int32(msgType);

            if (!encode)
                encode = msgObjectArray[0].constructor["encode"];       // 没有传入编码函数,则默认取 encode 函数.取不到的话表示传入错误了.

            const header = 10; // 1 << 3 | (2&7);  // 这块具体见 protobuf-net 的TrySerializeAuxiliaryType()函数实现
            msgObjectArray.forEach(msgObj => {
                encode(msgObj, pbWriter.uint32(header).fork()).ldelim();
            });

            // 写入消息数据
            const encodedData = pbWriter.finish();
            this.socket.send(encodedData);
        }

        /**
         * 直接发送字符串到服务器
         * @param msgType 指定消息类型
         * @param msgData 指定要发送的字符串消息数据
         */
        public sendString(msgType: EMessageType, msgData: string) {
            const pbWriter = protobuf.Writer.create();

            Global.Log.Info(`%c ====>> | ${this.mSendCount++} | ${EMessageType[msgType]}(${msgType})`, "color:red");

            // 写入消息Id
            pbWriter.int32(msgType);
            pbWriter.rawstring(msgData);
            const encodeData = pbWriter.finish();
            this.socket.send(encodeData);
        }

        /**
         * 注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
         * @param msgType 指定要侦听的消息
         * @param caller 侦听函数的执行域。
         * @param listener 接收到消息时的回调函数.  如 onLoginRet(protoReader: protobuf.Reader, args?: Array<any>)
         * @param args 消息侦听函数的回调参数。
         */
        public onMsg(msgType: EMessageType, caller: any, listener: Function, args?: any[]) {
            this.eventDispatcher.on(EMessageType[msgType], caller, listener, args);
        }

        /**
         * 注册指定类型的消息侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
         * @param msgType 指定要侦听的消息
         * @param caller 侦听函数的执行域
         * @param listener 消息侦听函数,如 onLoginRet(protoReader: protobuf.Reader, args?: Array<any>)
         * @param args （可选）消息侦听函数的回调参数。
         */
        public onceMsg(msgType: EMessageType, caller: any, listener: Function, args?: any[]) {
            this.eventDispatcher.once(EMessageType[msgType], caller, listener, args);
        }

        /**
         * 删除指定类型的消息侦听器。
         * @param msgType 要删除的消息类型
         * @param caller  侦听函数的执行域。
         * @param listener 侦听函数
         * @param onceOnly （可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
         */
        public offMsg(msgType: EMessageType, caller: any, listener: Function, onceOnly?: boolean) {
            this.eventDispatcher.off(EMessageType[msgType], caller, listener, onceOnly);
        }

        /**
         * 异步等待消息返回函数,某些时候方便访问
         * @param msgType 指定要等待的消息类型
         * @param timeOut 指定等待的超时时间(秒)
         * @return 如果指定了timeOut,超时时会返回 null,否则会返回接收到消息数据 Uint8Array
         * 注: 如果在等待时网络断开了,会返回 null
         * 注: 此函数不应该同时大量使用,估计会有性能问题
         */
        public async WaitMessage(msgType: EMessageType, timeOut?: number): Promise<protobuf.Reader> {
            return new Promise<protobuf.Reader>((resolve) => {
                // 超时或收到断开连接消息
                const timeOutOrDisconnect = () => {
                    resolveMsg(null);
                };

                // 收到消息时的回调函数
                const onMsgRet = (protoReader: protobuf.Reader) => {
                    resolveMsg(protoReader);
                };

                // 接收到消息后进行处理,清除之前监听的消息等.
                const resolveMsg = (result: null | protobuf.Reader) => {
                    // 移除消息监听
                    this.offMsg(msgType, this, onMsgRet);
                    this.offMsg(EMessageType.CMD_SOCKET_DISCONNECT, this, timeOutOrDisconnect);
                    Laya.timer.clear(this, timeOutOrDisconnect); // 移除定时器
                    resolve(result);
                };

                // 进入游戏获取的功能开启数据
                const onLoginGame = (protoReader: protobuf.Reader) => {
                    const aFields = gameIns.getStringMsgFields(protoReader);
                    MyUI.FunctionOpenManager.saveServerData(aFields[aFields.length - 1]);
                };

                // 监听给定的消息
                this.onceMsg(msgType, this, onMsgRet);
                this.onceMsg(EMessageType.CMD_SOCKET_DISCONNECT, this, timeOutOrDisconnect);
                this.onMsg(EMessageType.CMD_LOGIN, this, onLoginGame);        // 监听所有的网络消息

                if (timeOut && timeOut > 0 && !Global.VersionInfo.development) {  // 超时只在非开发版本起作用
                    // 如果指定了超时时间,则等待
                    Laya.timer.once(timeOut * 1000, this, timeOutOrDisconnect);
                }
            });
        }
        /**
         * 等待字符串类型的返回消息
         * @param msgType 指定要等待的消息Id
         * @param timeOut (可选)指定等待的超时时间
         * @return 返回值为null或对应的字符串消息内容
         * * 注: 此函数不应该同时大量使用,估计会有性能问题
         */
        public async WaitStringMessage(msgType: EMessageType, timeOut?: number): Promise<string> {
            const protoReader: protobuf.Reader = await this.WaitMessage(msgType, timeOut);
            if (protoReader == null) {
                return null;
            } else {
                return protoReader.rawstring();
            }
        }

        /**
         * 等待字符串类型的返回消息段信息,使用 : 分隔
         * @param msgType 指定要等待的消息Id
         * @param timeOut (可选)指定等待的超时时间
         * @return 返回值为null或对应的字符串消息内容
         * * 注: 此函数不应该同时大量使用,估计会有性能问题
         */
        public async WaitStringMsgFields(msgType: EMessageType, timeOut?: number): Promise<string[]> {
            const retStr = await this.WaitStringMessage(msgType, timeOut);
            if (retStr == null)
                return null;
            return retStr.split(":");
        }

        /**
         * 关闭Socket
         */
        public close(): void {
            this.socket.close();
        }
    }
}
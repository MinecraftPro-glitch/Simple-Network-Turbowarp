#Name - Network POST/GET Extension
#Author - Maxolian2010
#Version - 1.0

(function(Scratch) {
    'use strict';

    class NetworkExtension {
        getInfo() {
            return {
                id: 'networkRequests',
                name: 'Network Requests',
                blocks: [
                    {
                        opcode: 'sendGetRequest',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'GET request to [URL]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://example.com/api'
                            }
                        }
                    },
                    {
                        opcode: 'sendPostRequest',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'POST request to [URL] with JSON [BODY]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://example.com/api'
                            },
                            BODY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"key": "value"}'
                            }
                        }
                    }
                ]
            };
        }

        async sendGetRequest(args) {
            try {
                const response = await fetch(args.URL);
                return await response.text();
            } catch (error) {
                return `Error: ${error.message}`;
            }
        }

        async sendPostRequest(args) {
            try {
                const response = await fetch(args.URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: args.BODY
                });
                return await response.text();
            } catch (error) {
                return `Error: ${error.message}`;
            }
        }
    }

    Scratch.extensions.register(new NetworkExtension());
})(Scratch);

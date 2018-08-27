angular
	.module('decode')
    .factory('Socket', function (socketFactory) {
        return socketFactory({
            ioSocket: io.connect('http://localhost:3000/')
        });
    });

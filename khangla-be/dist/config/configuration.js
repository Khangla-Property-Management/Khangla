"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app: {
        name: process.env.APP_NAME ?? 'khanla-be',
        env: process.env.NODE_ENV ?? 'development',
        port: Number.parseInt(process.env.PORT ?? '3000', 10),
        corsOrigin: process.env.CORS_ORIGIN ?? '*',
    },
});
//# sourceMappingURL=configuration.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const corsOrigin = configService.get('app.corsOrigin') ?? '*';
    const normalizedCorsOrigin = corsOrigin === '*'
        ? '*'
        : corsOrigin.split(',').map((origin) => origin.trim());
    app.enableCors({
        origin: normalizedCorsOrigin,
        credentials: true,
    });
    const port = configService.get('app.port') ?? 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
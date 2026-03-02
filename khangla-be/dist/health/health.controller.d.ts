import { ConfigService } from '@nestjs/config';
export declare class HealthController {
    private readonly configService;
    constructor(configService: ConfigService);
    getHealth(): {
        status: string;
        app: string;
        environment: string;
        timestamp: string;
    };
}

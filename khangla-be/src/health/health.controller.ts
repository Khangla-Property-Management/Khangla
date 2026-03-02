import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHealth() {
    return {
      status: 'ok',
      app: this.configService.get<string>('app.name') ?? 'khanla-be',
      environment: this.configService.get<string>('app.env') ?? 'development',
      timestamp: new Date().toISOString(),
    };
  }
}
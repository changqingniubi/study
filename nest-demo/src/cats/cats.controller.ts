import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Header,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

import { ForbiddenException } from '../common/exception/forbidden.exception';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';
import { ZodValidationPipe } from '../common/pipe/zod.validation.pipe';

import { RolesGuard } from '../common/guard/roles.guard';

import { Roles } from '../common/decorator/roles.decorator';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';
import { User } from '../common/decorator/user.decorator';
@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  //@UseFilters(HttpExceptionFilter)
  //@UsePipes(new ZodValidationPipe(createCatSchema))
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  @Header('Content-Type', 'applation/json')
  @Roles(['admin'])
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto): void {
    // 您正在发送 form-data默认情况下，NestJS 没有正确解析。您可以使用 application/x-www-url-form-encoded或 application/json随着raw postman 中的选项。 JSON 正文如下所示:
    //console.log(createCatDto);
    //throw new ForbiddenException();
    this.catsService.create(createCatDto);
  }
  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    //return this.catsService.findAll();

    try {
      const result = await this.catsService.findAll();
      return result;
    } catch (error) {
      // throw new HttpException(
      //   {
      //     status: HttpStatus.FORBIDDEN,
      //     error: 'This is a custom message',
      //   },
      //   HttpStatus.FORBIDDEN,
      //   {
      //     cause: error,
      //   },
      // );
      throw new ForbiddenException();
    }
  }
  // @Get(':id')
  // findOne(
  //   //@Param('id', ParseIntPipe)
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ): string {
  //   //http://localhost:3000/cats/1
  //   console.log(id);
  //   return `This action returns a #${id} cat`;
  // }

  @Get('one')
  async findOne2(@User('firstName') firstName: string) {
    console.log(`Hello ${firstName}`);
  }
  // @Get('async')
  // async findAllAsync(): Promise<any[]> {
  //   return new Promise<any[]>((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve([
  //         {
  //           id: 1,
  //           name: 'cat1',
  //         },
  //         {
  //           id: 2,
  //           name: 'cat2',
  //         },
  //       ]);
  //     }, 1000);
  //   });
  // }
}

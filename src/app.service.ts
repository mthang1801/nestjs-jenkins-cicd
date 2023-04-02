import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
	const a = 5 ; 
	let b = a ;
	if (b === a) return 'Hello World!';
	throw new Error("Something went wrong!")
  }
}

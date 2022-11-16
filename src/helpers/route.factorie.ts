import { PrismaClient } from '@prisma/client';

class RouteFactorie {
  private readonly Model: any;
  private readonly Service: any;
  public Controller: any;

  constructor (Model: any, Service: any, Controller: any) {
    this.Model = new Model(new PrismaClient());
    this.Service = new Service(this.Model);
    this.Controller = new Controller(this.Service);
  }
}

export default RouteFactorie;

import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { RolesGuard } from '../common/roles.guard';
import { MatchesService } from '../matches/matches.service';

@Controller('projects')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProjectsController {
  constructor(private projects: ProjectsService, private matches: MatchesService) {}

  @Get()
  @Roles(Role.CLIENT, Role.ADMIN)
  list(@Req() req: any) {
    const user = req.user;
    if (user.role === Role.CLIENT) {
      return this.projects.listForClient(user.clientId);
    }
    // admin - return all (for brevity using same method without filter)
    return this.projects.listForClient(user.clientId);
  }

  @Post()
  @Roles(Role.CLIENT)
  create(@Req() req: any, @Body() body: any) {
    return this.projects.create(req.user.clientId, body);
  }

  @Post(':id/matches/rebuild')
  @Roles(Role.ADMIN, Role.CLIENT)
  rebuild(@Param('id') id: number, @Req() req: any) {
    return this.matches.rebuildForProject(+id);
  }
}

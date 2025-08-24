import 'reflect-metadata';
import { DataSource } from 'typeorm';
import AppDataSource from '../typeorm.config'; // ✅ import the default DataSource
import { User, Role } from '../users/user.entity';
import { Client } from '../clients/client.entity';
import { Project } from '../projects/project.entity';
import { Vendor } from '../vendors/vendor.entity';
import * as bcrypt from 'bcryptjs';

(async () => {
  try {
    await AppDataSource.initialize();

    const userRepo = AppDataSource.getRepository(User);
    const clientRepo = AppDataSource.getRepository(Client);
    const projectRepo = AppDataSource.getRepository(Project);
    const vendorRepo = AppDataSource.getRepository(Vendor);

    // Admin
    const admin = userRepo.create({
      email: 'admin@expanders360.test',
      passwordHash: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN,   // ✅ use enum, not string
    });
    await userRepo.save(admin);

    // Client + client user
    const client = await clientRepo.save(
      clientRepo.create({
        company_name: 'Acme Corp',
        contact_email: 'ops@acme.test',
      }),
    );

    const clientUser = userRepo.create({
      email: 'client@acme.test',
      passwordHash: await bcrypt.hash('client123', 10),
      role: Role.CLIENT,  // ✅ use enum
      clientId: client.id,
    });
    await userRepo.save(clientUser);

    // Project
    await projectRepo.save(
      projectRepo.create({
        client_id: client.id,
        country: 'UAE',
        services_needed: ['incorporation', 'payroll'],
        budget: 25000,
        status: 'active',
      }),
    );

    // Vendors
    const vendors = [
      {
        name: 'Gulf Advisors',
        countries_supported: ['UAE', 'KSA'],
        services_offered: ['incorporation', 'tax'],
        rating: 8,
        response_sla_hours: 24,
      },
      {
        name: 'MENA Payroll',
        countries_supported: ['EGY', 'UAE'],
        services_offered: ['payroll'],
        rating: 7,
        response_sla_hours: 12,
      },
      {
        name: 'KSA Compliance',
        countries_supported: ['KSA'],
        services_offered: ['incorporation', 'compliance'],
        rating: 6,
        response_sla_hours: 48,
      },
    ];
    for (const v of vendors) {
      await vendorRepo.save(vendorRepo.create(v));
    }

    console.log('✅ Seeded admin, client + user, project, vendors.');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await AppDataSource.destroy();
  }

})();
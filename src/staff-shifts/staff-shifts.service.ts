import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffShiftsInput } from './dto/inputs/create-staff-shifts.input';
import { UpdateStaffShiftsInput } from './dto/inputs/update-staff-shifts.input';

@Injectable()
export class StaffShiftsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const turnos = await this.prisma.turno.findMany({
            where: { activo: true },
            orderBy: { fecha_creacion: 'asc' },
        });

        const activeIds = await this.getActivePersonalIds();

        const updatedTurnos = await Promise.all(
            turnos.map(async (turno) => {
                const filteredIds = turno.personal_asignado.filter((id: number) =>
                    activeIds.includes(id),
                );

                if (filteredIds.length !== turno.personal_asignado.length) {
                    await this.prisma.turno.update({
                        where: { id_turno: turno.id_turno },
                        data: { personal_asignado: filteredIds },
                    });
                    turno.personal_asignado = filteredIds;
                }

                return turno;
            }),
        );

        return updatedTurnos;
    }

    async findOne(id: number) {
        const turno = await this.prisma.turno.findUnique({
            where: { id_turno: id },
        });

        if (!turno) throw new NotFoundException(`Turno con id ${id} no encontrado`);

        const activeIds = await this.getActivePersonalIds();

        const filteredIds = turno.personal_asignado.filter((id: number) =>
            activeIds.includes(id),
        );

        if (filteredIds.length !== turno.personal_asignado.length) {
            await this.prisma.turno.update({
                where: { id_turno: id },
                data: { personal_asignado: filteredIds },
            });
            turno.personal_asignado = filteredIds;
        }

        return turno;
    }

    async create(data: StaffShiftsInput) {
        return this.prisma.turno.create({
            data,
        });
    }

    async update(id: number, data: UpdateStaffShiftsInput) {
        await this.validateShiftExists(id);

        return this.prisma.turno.update({
            where: { id_turno: id },
            data,
        });
    }

    async remove(id: number) {
        await this.validateShiftExists(id);

        return this.prisma.turno.update({
            where: { id_turno: id },
            data: { activo: false },
        });
    }

    private async getActivePersonalIds(): Promise<number[]> {
        const personals = await this.prisma.personal.findMany({
            where: { activo: true },
            select: { id_personal: true },
        });
        return personals.map((p) => p.id_personal);
    }

    private async validateShiftExists(id: number) {
        const turno = await this.prisma.turno.findUnique({
            where: { id_turno: id },
        });

        if (!turno) {
            throw new NotFoundException(`Turno con id ${id} no encontrado`);
        }
        return turno;
    }
}

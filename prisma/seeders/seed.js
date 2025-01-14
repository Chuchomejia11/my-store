"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var producto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Insertar datos de ejemplo para TipoProducto
                return [4 /*yield*/, prisma.tipoProducto.createMany({
                        data: [
                            { name: 'Pegatina' },
                            { name: 'Ropa' },
                            { name: 'Figuras' },
                            { name: 'TCG' },
                            { name: 'Consola' }
                        ],
                        skipDuplicates: true // Evitar duplicados
                    })];
                case 1:
                    // Insertar datos de ejemplo para TipoProducto
                    _a.sent();
                    // Insertar datos de ejemplo para EstatusProducto
                    return [4 /*yield*/, prisma.estatusProducto.createMany({
                            data: [
                                { name: 'Nuevo' },
                                { name: 'Usado' },
                                { name: 'Dañado' },
                                { name: 'Abierto' }
                            ],
                            skipDuplicates: true // Evitar duplicados
                        })];
                case 2:
                    // Insertar datos de ejemplo para EstatusProducto
                    _a.sent();
                    // Insertar datos de ejemplo para TipoPago
                    return [4 /*yield*/, prisma.tipoPago.createMany({
                            data: [
                                { name: 'Efectivo' },
                                { name: 'Tarjeta' }
                            ],
                            skipDuplicates: true // Evitar duplicados
                        })];
                case 3:
                    // Insertar datos de ejemplo para TipoPago
                    _a.sent();
                    // Insertar datos de ejemplo para TipoMovimiento
                    return [4 /*yield*/, prisma.tipoMovimiento.createMany({
                            data: [
                                { name: 'Venta' },
                                { name: 'Gasto' },
                                { name: 'Compra' },
                                { name: 'Devolución por parte del proveedor' },
                                { name: 'Devolución al parte del cliente' }
                            ],
                            skipDuplicates: true // Evitar duplicados
                        })];
                case 4:
                    // Insertar datos de ejemplo para TipoMovimiento
                    _a.sent();
                    return [4 /*yield*/, prisma.producto.upsert({
                            where: { id: 1 },
                            update: {},
                            create: {
                                name: 'TTGL Pegatina 01',
                                tipoProductoId: 1, // Pegatina
                                precioSugerido: 200,
                                precioTienda: 150,
                                fechaAñadido: new Date(),
                                estatusProductoId: 1, // Nuevo
                                estatus: 'Disponible'
                            }
                        })];
                case 5:
                    producto = _a.sent();
                    // Asegurarse de que la venta ya existe o se crea
                    return [4 /*yield*/, prisma.venta.upsert({
                            where: { id: 1 },
                            update: {},
                            create: {
                                employeeNumber: '202301001',
                                ventas: JSON.stringify([{ productoId: producto.id, cantidad: 2 }]),
                                pago: 300,
                                cambio: 0,
                                tipoPagoId: 1, // Efectivo
                                fecha: new Date(),
                                descuento: 10
                            }
                        })];
                case 6:
                    // Asegurarse de que la venta ya existe o se crea
                    _a.sent();
                    console.log('Datos insertados correctamente.');
                    return [2 /*return*/];
            }
        });
    });
}
// Llamar a la función principal para ejecutar el seeder
main()
    .catch(function (e) {
    throw e;
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Función para insertar ventas aleatorias
function seedVentas() {
    return __awaiter(this, void 0, void 0, function () {
        var productos, empleados, tipoPagos, i, randomEmpleado, randomTipoPago, ventas, j, randomProducto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.producto.findMany()];
                case 1:
                    productos = _a.sent();
                    return [4 /*yield*/, prisma.employee.findMany()];
                case 2:
                    empleados = _a.sent();
                    return [4 /*yield*/, prisma.tipoPago.findMany()];
                case 3:
                    tipoPagos = _a.sent();
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < 90)) return [3 /*break*/, 7];
                    randomEmpleado = empleados[Math.floor(Math.random() * empleados.length)];
                    randomTipoPago = tipoPagos[Math.floor(Math.random() * tipoPagos.length)];
                    ventas = [];
                    for (j = 0; j < 20; j++) {
                        randomProducto = productos[Math.floor(Math.random() * productos.length)];
                        ventas.push({
                            productoId: randomProducto.id,
                            cantidad: faker_1.faker.number.int({ min: 1, max: 5 })
                        });
                    }
                    return [4 /*yield*/, prisma.venta.create({
                            data: {
                                employeeNumber: randomEmpleado.employeeNumber,
                                ventas: JSON.stringify(ventas),
                                pago: faker_1.faker.number.int({ min: 100, max: 1000 }),
                                cambio: faker_1.faker.number.int({ min: 0, max: 100 }),
                                tipoPagoId: randomTipoPago.id,
                                fecha: faker_1.faker.date.past({ years: 0.25 }), // Últimos 3 meses
                                descuento: faker_1.faker.number.int({ min: 0, max: 50 })
                            }
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7:
                    console.log('Ventas insertadas correctamente.');
                    return [2 /*return*/];
            }
        });
    });
}
seedVentas()
    .catch(function (e) {
    throw e;
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

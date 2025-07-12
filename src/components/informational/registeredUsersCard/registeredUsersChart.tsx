// components/ui/RegisteredUsersChart.tsx
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    CartesianGrid,
} from "recharts";
import { Box, useColorModeValue } from "@chakra-ui/react";

// Colores igual que los usados antes
const colorMap: Record<string, string> = {
    "ESB": "#ED330C",
    "Sob.": "#01346B",
    "ESB A": "#ED330C",
    "Sob. A": "#386CB0",
    "ESB o Sob. B": "#F9A825",
    "6x4": "#2E7D32",
    "MEX": "#D81B60",
    "GDL": "#8E24AA",
    "MTY": "#546E7A",
    "CUN": "#0097A7",
    "TIJ": "#8D6E63",
};

// Datos simulados por categoría
type CategoriaData = { name: string; "ESB"?: number; "Sob."?: number };
type ApartadoData = { name: string; "ESB A"?: number; "Sob. A"?: number; "ESB o Sob. B"?: number; "6x4"?: number };
type BaseODVTData = { name: string; "MEX"?: number; "GDL"?: number; "MTY"?: number; "CUN"?: number; "TIJ"?: number };

const dataByType: {
    Categoria: CategoriaData[];
    Apartado: ApartadoData[];
    "Base o DVT": BaseODVTData[];
} = {
    Categoria: [
        { name: "Lun", "ESB": 20, "Sob.": 30 },
        { name: "Mar", "ESB": 35, "Sob.": 15 },
        { name: "Mié", "ESB": 25, "Sob.": 20 },
        { name: "Jue", "ESB": 40, "Sob.": 35 },
        { name: "Vie", "ESB": 30, "Sob.": 25 },
        { name: "Sáb", "ESB": 15, "Sob.": 10 },
        { name: "Dom", "ESB": 10, "Sob.": 5 },
    ],
    Apartado: [
        { name: "Lun", "ESB A": 10, "Sob. A": 12, "ESB o Sob. B": 15, "6x4": 5 },
        { name: "Mar", "ESB A": 15, "Sob. A": 8, "ESB o Sob. B": 10, "6x4": 7 },
        { name: "Mié", "ESB A": 20, "Sob. A": 10, "ESB o Sob. B": 18, "6x4": 4 },
        { name: "Jue", "ESB A": 12, "Sob. A": 15, "ESB o Sob. B": 12, "6x4": 10 },
        { name: "Vie", "ESB A": 18, "Sob. A": 20, "ESB o Sob. B": 15, "6x4": 8 },
        { name: "Sáb", "ESB A": 10, "Sob. A": 5, "ESB o Sob. B": 8, "6x4": 3 },
        { name: "Dom", "ESB A": 8, "Sob. A": 4, "ESB o Sob. B": 7, "6x4": 2 },
    ],
    "Base o DVT": [
        { name: "Lun", "MEX": 10, "GDL": 12, "MTY": 8, "CUN": 6, "TIJ": 4 },
        { name: "Mar", "MEX": 8, "GDL": 10, "MTY": 6, "CUN": 5, "TIJ": 3 },
        { name: "Mié", "MEX": 12, "GDL": 14, "MTY": 10, "CUN": 7, "TIJ": 6 },
        { name: "Jue", "MEX": 15, "GDL": 10, "MTY": 12, "CUN": 9, "TIJ": 7 },
        { name: "Vie", "MEX": 18, "GDL": 16, "MTY": 11, "CUN": 8, "TIJ": 6 },
        { name: "Sáb", "MEX": 7, "GDL": 6, "MTY": 5, "CUN": 4, "TIJ": 2 },
        { name: "Dom", "MEX": 5, "GDL": 4, "MTY": 3, "CUN": 2, "TIJ": 1 },
    ],
};

interface RegisteredUsersChartProps {
    selectedType: keyof typeof dataByType;
}

export const RegisteredUsersChart = ({
    selectedType,
}: RegisteredUsersChartProps) => {
    const bg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const data = dataByType[selectedType];
    const keys = Object.keys(data[0]).filter((k) => k !== "name");

    return (
        <Box px={6} py={4} bg={bg}  borderColor={borderColor}> 
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barSize={10}>
                <CartesianGrid stroke="#454459" vertical={false} />
                    <XAxis
                        dataKey="name" tick={{ fill: "#0D47A1", fontSize: 12, fontWeight: "regular" }}
                        axisLine={{ stroke: "#454459" }}
                        tickLine={{ stroke: "#454459" }}
                    />
                    <YAxis 
                        domain={[0, "dataMax"]} 
                        tick={{ fill: "#0D47A1", fontSize: 12, fontWeight: "regular" }} 
                        axisLine={{ stroke: "#454459" }} 
                        tickLine={{ stroke: "#454459" }} 
                    />
                    <Tooltip />
                    {keys.map((key, index) => (
                        <Bar
                        key={key}
                        dataKey={key}
                        stackId="a"
                        fill={colorMap[key]}
                        name={key}
                        radius={index === keys.length - 1 ? [10, 10, 0, 0] : [0, 0, 0, 0]}
                        />
                    ))}
            </BarChart>
        </ResponsiveContainer>
        </Box>
    );
};

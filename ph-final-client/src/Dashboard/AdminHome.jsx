import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../Custom/CustomAxios/useAxios";
import UseAuth from "../Custom/cutomAuth/UseAuth";
import { FaUsers } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { TbListNumbers } from "react-icons/tb";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
const AdminHome = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  const { data: OrderStats = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("order-stats");
      return res.data;
    },
  });
  //custom shaped bar charts
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
    //custom shaped pie charts
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
    const pieChartData = OrderStats.map(data => {
        return {name : data.category, value : data.revenue}
    })

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-900 bg-blue-100 p-5">
        Hello, {user.displayName}
      </h1>
      <div className="flex flex-col gap-3 justify-center mt-10 items-center">
        <h2 className="text-sm font-semibold text-green-700 bg-green-100 p-3 w-full">
          Revenue and overview dashboard
        </h2>
        <div>
          <div className="stats shadow">
            <div className="stat flex min-w-[230px] flex-col gap-3 place-items-center">
              <div className="stat-title text-xl ">Revenue</div>
              <div className="stat-value">$ {stats?.foundRevenue}</div>
            </div>

            <div className="stat min-w-[230px] place-items-center flex flex-col gap-3">
              <div className="stat-title text-xl">Users</div>
              <div className="stat-value text-secondary items-center flex gap-2">
                <FaUsers></FaUsers> {stats?.users}
              </div>
            </div>

            <div className="stat min-w-[230px] place-items-center flex flex-col gap-3">
              <div className="stat-title text-xl">Items</div>
              <div className="stat-value flex gap-2 items-center">
                <TbListNumbers></TbListNumbers> {stats?.menuItems}
              </div>
            </div>
            <div className="stat min-w-[230px] place-items-center flex flex-col gap-3">
              <div className="stat-title text-xl">Orders</div>
              <div className="stat-value flex gap-2 items-center">
                <BsFillBoxSeamFill></BsFillBoxSeamFill> {stats?.orders}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-sm font-bold text-green-900 mt-5 bg-green-100 p-5">
        Statistics of orders
      </h2>
      <div className="flex gap-5 mt-10 justify-between items-center">
        <div className="">
          <BarChart
            width={500}
            height={300}
            data={OrderStats}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {OrderStats?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
                      </Pie>
                      <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

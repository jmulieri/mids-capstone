import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useEnrollmentsByAge from '../../hooks/useEnrollmentsByAge';

const EnrollmentsByAgeComponent = () => {
  const { data } = useEnrollmentsByAge();

  console.log(data);
  return (
    <div>
      <ResponsiveContainer width="100%" height={400} className={"p-2"}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnrollmentsByAgeComponent;
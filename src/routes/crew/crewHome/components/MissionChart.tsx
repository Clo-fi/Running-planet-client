import { ResponsiveContainer, BarChart, Bar, XAxis, LabelList } from 'recharts';

interface Props {
  data: number[];
}

const MissionChart = (data: Props) => {

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const progressData = data?.data.map((value, index) => ({
    name: daysOfWeek[index],
    progress: value
  }));

  return (
    <ResponsiveContainer width='90%' height={200}>
      <BarChart data={progressData} margin={{ top: 20 }}>
        <XAxis dataKey="name" />
        <Bar dataKey="progress" fill='#ffffff' barSize={30} >
          <LabelList dataKey={'progress'} position={'top'} formatter={(value: number) => `${value}%`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MissionChart

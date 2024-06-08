import { useState } from 'react';
import styles from './CrewSearchPage.module.scss';
import SearchForm from './components/SearchForm';
import CrewList from './components/CrewList';
import instance from '../../../libs/api/axios';
import { CrewListType } from '../../../types/crew/crewList';
import { useQuery } from '@tanstack/react-query';

const fetchCrewList = async (crewName: string, category: string): Promise<CrewListType[]> => {
  const response = await instance.get('/crew', {
    params: {
      crewName: crewName || undefined,
      category: category || undefined,
    }
  });
  console.log(response);
  return response.data;
}

const CrewSearchPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchCrewName, setSearchCrewName] = useState('');

  const { data, isError, error, isLoading } = useQuery<CrewListType[], Error>({
    queryKey: ['crewList', selectedCategory, searchCrewName],
    queryFn: () => fetchCrewList(searchCrewName, selectedCategory),
    enabled: true
  });

  const handleSearch = (searchCrewName: string) => {
    setSearchCrewName(searchCrewName);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <div className={styles.search__main_container}>
        <SearchForm
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
        />
        <CrewList
          data={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage={error}
        />
      </div>
    </div>
  )
}
export default CrewSearchPage;

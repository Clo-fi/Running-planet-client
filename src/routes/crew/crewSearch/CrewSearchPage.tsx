import { useState } from 'react';
import styles from './CrewSearchPage.module.scss';
import SearchForm from './components/SearchForm';
import CrewList from './components/CrewList';
import instance from '../../../libs/api/axios';
import { CrewListType } from '../../../types/crewList';
import { useQuery } from '@tanstack/react-query';

const fetchCrewList = async (): Promise<CrewListType[]> => {
  const response = await instance.get('/crew');
  return response.data;
}

const CrewSearchPage = () => {
  const { data, isError, error, isLoading } = useQuery<CrewListType[], Error>({
    queryKey: ['crewList'],
    queryFn: fetchCrewList
  });

  const [selectedState, setSelectedState] = useState('ALL');
  const [searchCrewName, setSearchCrewName] = useState('');

  const handleSearch = (searchCrewName: string) => {
    setSearchCrewName(searchCrewName);
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
  };
  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <div className={styles.search__main_container}>
        <SearchForm
          selectedState={selectedState}
          onStateChange={handleStateChange}
          onSearch={handleSearch}
        />
        <CrewList
          selectedState={selectedState}
          searchedCrewName={searchCrewName}
          data={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage={error}
          onSearch={handleSearch}
        />
      </div>

    </div>
  )
}
export default CrewSearchPage;

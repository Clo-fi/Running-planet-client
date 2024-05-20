// CrewSearchPage.tsx
import React, { useState } from 'react';
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

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <div className={styles.search__main_container}>
        <SearchForm handleSearch={handleSearch} />
        <CrewList data={data} searchKeyword={searchKeyword} isLoading={isLoading} isError={isError} errorMessage={error?.message} />
      </div>
    </div>
  )
}
export default CrewSearchPage;

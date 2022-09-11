import { Empty, Pagination } from 'antd';
import * as _ from 'lodash';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import CarCard from '../../components/CarCard';
import PageFooter from '../../components/Footer';
import Header from '../../components/Header';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
  getCarAction,
  getCarAttributeAction,
  getCarAttributeTypeAction,
  updateFilter,
} from '../../redux/reducer/car';
import ClearFilter from './ClearFilter';
import SearchBar from './SearchBar';
import SelectFilter from './SelectFilter';
import SelectSort from './SelectSort';
import { getUserInformationAction } from '../../redux/reducer/user';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.car.filter);
  const cars = useAppSelector((state) => state.car.cars);
  const carAttribute = useAppSelector((state) => state.car.attributes);
  const carAttributeType = useAppSelector((state) => state.car.attributeTypes);
  const user = useAppSelector((state) => state.user.info);
  const attributeByType = _.groupBy(carAttribute, 'type.id');

  const onPageChange = (page: number, pageChange: number) => {};

  const onUpdateFilter = (data: string) => {
    const newAttributesArr = _.uniq([...(filter.attribute || []), data]);
    dispatch(updateFilter({ ...filter, attribute: newAttributesArr }));
  };

  const onClearFilter = () => {
    dispatch(updateFilter({ ...filter, attribute: [] }));
  };

  const getMe = async () => {
    try {
      const cookies = new Cookies();
      const accessToken = cookies.get('access_token');
      if (accessToken) {
        dispatch(getUserInformationAction());
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (err) {}
  };

  useEffect(() => {
    dispatch(getCarAttributeAction());
    dispatch(getCarAttributeTypeAction());
    getMe();
  }, []);

  useEffect(() => {
    dispatch(getCarAction(filter));
  }, [JSON.stringify(filter)]);

  return (
    <div className='min-h-screen'>
      <Header />
      <SearchBar />
      <div className='my-4 flex h-full flex-col gap-4 md:m-8'>
        <div className='flex min-h-fit w-full flex-wrap items-center justify-start px-4 md:flex-nowrap'>
          {carAttributeType.slice(0, 3).map((type) => (
            <SelectFilter
              key={type.id}
              type={type}
              data={attributeByType[type.id] || []}
              updateFilter={onUpdateFilter}
              currentFilterAttribute={filter.attribute || []}
            />
          ))}
          <ClearFilter onClear={onClearFilter} />
          <SelectSort />
        </div>
        <div className='mt-3 px-4' style={{ minHeight: 500 }}>
          {cars.length == 0 ? (
            <div className='mt-24'>
              <Empty />
            </div>
          ) : (
            <>
              <h1 className='text-2xl'>123 Cars Found</h1>
              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                {cars.map((value, index) => (
                  <CarCard key={value.id} car={value} />
                ))}
              </div>
              <div className='mt-8 flex justify-end'>
                <Pagination
                  defaultCurrent={1}
                  total={50}
                  onChange={onPageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

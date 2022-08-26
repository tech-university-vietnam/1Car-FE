import CarCard from '../../components/CarCard';
import PageFooter from '../../components/Footer';
import Header from '../../components/Header';
import ClearFilter from './ClearFilter';
import SearchBar from './SearchBar';
import SelectFilter from './SelectFilter';
import SelectSort from './SelectSort';

export default function HomePage() {
  const cars = Array.from(Array(10).keys()); //TODO change this
  return (
    <div className='min-h-screen'>
      <Header />
      <SearchBar />
      <div className='my-4 flex h-full flex-col gap-4 md:m-8'>
        <div className='flex min-h-fit w-full flex-wrap items-center justify-start px-4 md:flex-nowrap'>
          <SelectFilter />
          <SelectFilter />
          <SelectFilter />
          <ClearFilter />
          <SelectSort />
        </div>
        <div className='mt-3 px-4'>
          <h1 className='text-2xl'>123 Cars Found</h1>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {cars.map((value, index) => (
              <CarCard />
            ))}
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

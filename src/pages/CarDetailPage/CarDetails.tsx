import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Rate,
  Tooltip,
  List,
  Comment,
  Button,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getCarDetails } from '../../apis';
import InfoCard from '../../components/InfoCard';
import { Car } from '../../redux/reducer/car';

const data = [
  {
    actions: [<span key='comment-list-reply-to-0'>Reply to</span>],
    author: 'Vu Duong',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: <p>Good car, good service, would rent again.</p>,
    datetime: (
      <Tooltip
        title={moment('2016-11-22')
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment('2016-11-22').subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key='comment-list-reply-to-0'>Reply to</span>],
    author: 'Chuong',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: <p>Perfect cars, I love it. Will introduce to friends.</p>,
    datetime: (
      <Tooltip
        title={moment('2016-11-22')
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment('2016-11-22').subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key='comment-list-reply-to-0'>Reply to</span>],
    author: 'Nina Nguyen',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: <p>Good website, best UI, UX. Make like easier.</p>,
    datetime: (
      <Tooltip
        title={moment('2016-11-22')
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment('2016-11-22').subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key='comment-list-reply-to-0'>Reply to</span>],
    author: 'Peter',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: <p>Smooth checkout process.</p>,
    datetime: (
      <Tooltip
        title={moment('2016-11-22')
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment('2016-11-22').subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

interface CarDetailsProps {
  car: Car;
  isLoading: boolean;
}
export default function CarDetails({ car, isLoading }: CarDetailsProps) {
  const [details, setDetails] = useState<[string, unknown][]>();
  const [description, setDescription] = useState('');
  useEffect(() => {
    (async () => {
      const { description, ...rest } = await getCarDetails(car.id);
      setDetails(Object.entries(rest.specs));
      setDescription(description);
    })();
  }, []);
  return (
    <InfoCard>
      {isLoading ? (
        <></>
      ) : (
        <Carousel autoplay dotPosition='bottom'>
          {car.images ? (
            car.images.map((image: string, index: any) => (
              <div
                key={index}
                className=' flex w-full items-center justify-center overflow-hidden'
              >
                <div className='h-[400px]'>
                  <Image
                    src={image}
                    preview={false}
                    height='100%'
                    width='100%'
                    alt={`${car.name} ${index + 1}`}
                    className='mx-auto h-full w-full items-center justify-center bg-slate-200 object-contain'
                  />
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </Carousel>
      )}
      <Row>
        <Col span={24} className='py-4'>
          <InfoCard loading={isLoading}>
            {isLoading ? (
              <></>
            ) : (
              <>
                <Row>
                  <Typography.Title level={3} className='mb-4 '>
                    {car.name}
                  </Typography.Title>
                </Row>
                <Row className='mb-4'>
                  <div className='flex items-center justify-center'>
                    <Rate disabled value={5} />
                    <span className='ml-4 mt-2'>25 reviews</span>
                  </div>
                </Row>
                <Row gutter={[0, 24]}>
                  <Col lg={8}>
                    <Typography.Title level={5}>
                      Specifications
                    </Typography.Title>
                  </Col>
                  <Col lg={16}>
                    <Row>
                      {details?.map(([key, val], index) => (
                        <Col span={12}>
                          <Typography.Title
                            level={5}
                            key={index}
                            className='text-lg'
                          >
                            <span className='font-bold '>{`${key}: `}</span>
                            {`${val}`}
                          </Typography.Title>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <Row gutter={[0, 24]}>
                  <Col lg={8}>
                    <Typography.Title level={5}>Description</Typography.Title>
                  </Col>
                  <Col>
                    <div className='text-md'>
                      {description ? description : 'No descriptions provided'}
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </InfoCard>
          <InfoCard>
            <Typography.Title level={5} className=''>
              Key spec of {car.name}
            </Typography.Title>
            <div className='mt-4 flex flex-wrap items-center justify-between'>
              <div className='flex w-1/2 flex-col items-center justify-center md:w-auto'>
                <img src='/fast.png' className='w-12' />
                <p className='mb-1 text-sm text-gray-300'>Mileage (upto)</p>
                <p className='text-base text-gray-500'>7.87 kmpl</p>
              </div>
              <div className='flex w-1/2 flex-col items-center justify-center md:w-auto'>
                <img src='/engine.png' className='w-12' />
                <p className='mb-1 text-sm text-gray-300'>Engine (upto)</p>
                <p className='text-base text-gray-500'>3996 cc</p>
              </div>
              <div className='flex w-1/2 flex-col items-center justify-center md:w-auto'>
                <img src='/manual-transmission.png' className='w-12' />
                <p className='mb-1 text-sm text-gray-300'>Transmission</p>
                <p className='text-base text-gray-500'>Manual</p>
              </div>
              <div className='flex w-1/2 flex-col items-center justify-center md:w-auto'>
                <img src='/seat.png' className='w-12' />
                <p className='mb-1 text-sm text-gray-300'>Seat</p>
                <p className='text-base text-gray-500'>6</p>
              </div>
              <div className='flex w-1/2 flex-col items-center justify-center md:w-auto'>
                <img src='/gps.png' className='w-12' />
                <p className='mb-1 text-sm text-gray-300'>GPS</p>
                <p className='text-base text-gray-500'>Google map</p>
              </div>
              <div className='flex w-1/2 flex-col items-center justify-center md:w-auto'>
                <img src='/thunderbolt.png' className='w-12' />
                <p className='mb-1 text-sm text-gray-300'>BHP</p>
                <p className='text-base text-gray-500'>641.0</p>
              </div>
            </div>
          </InfoCard>
          <InfoCard>
            <Typography.Title level={5} className=''>
              {car.name} Latest Update
            </Typography.Title>
            <div>
              Latest Update: The Urus is priced from Rs 3.15 crore to Rs 3.43
              crore (ex-showroom). It is available in two variants: V8 and Pearl
              Capsule. Lamborghini offers the SUV in a 5-seater configuration.
              The Urus is powered by a 4.0-litre twin-turbo V8 engine
              (650PS/850Nm), mated to an 8-speed automatic. It can complete the
              0-100kmph run in 3.6 seconds and has a top
            </div>
            <div className='mt-2'>
              <Button>Read more</Button>
            </div>
          </InfoCard>
          <InfoCard>
            <Typography.Title level={5} className=''>
              Latest reviews
            </Typography.Title>
            <List
              className='comment-list'
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item) => (
                <li>
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  />
                </li>
              )}
            />
          </InfoCard>
        </Col>
      </Row>
    </InfoCard>
  );
}

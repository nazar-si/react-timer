import { Suspense } from 'react';
import Layout from './components/Layout/Layout';
import MainTimer from './components/MainTimer/MainTimer';

export default function App() {
  return (
    <Layout>
      <Suspense>
        <MainTimer></MainTimer>
      </Suspense>
    </Layout>
  );
}

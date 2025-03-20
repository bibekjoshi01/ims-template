import { ComponentType, Suspense } from 'react';

// project import
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;

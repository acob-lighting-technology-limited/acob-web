import LoadingLayout from './loading-layout';
import SimpleSpinnerExit from '@/components/loader/simple-spinner-exit';

export default function Loading() {
  return (
    <LoadingLayout>
      <SimpleSpinnerExit preview={true} />
    </LoadingLayout>
  );
}

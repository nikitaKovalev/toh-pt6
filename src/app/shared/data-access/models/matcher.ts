import {Mapper} from '@shared/pipes/filter.pipe';

export type Matcher<I> = Mapper<I, boolean>;

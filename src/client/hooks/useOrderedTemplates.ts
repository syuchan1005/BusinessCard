import { useMemo } from 'react';

const useOrderedTemplates = (templates) => useMemo(() => (templates ? [
  templates.filter(({ type }) => type === 'FRONT')[0],
  templates.filter(({ type }) => type === 'BACK')[0],
] : [undefined, undefined]), [templates]);

export default useOrderedTemplates;

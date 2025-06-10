import Header from './Header';

import { getSession } from '@/lib/session';

export default async function HeaderWrapper() {
    const session = await getSession();
    const isAuthenticated = session !== null && session !== undefined;

    return <Header isAuthenticated={isAuthenticated} />
}
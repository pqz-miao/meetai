import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { 
    MeetingIdView, 
    MeetingIdViewError, 
    MeetingIdViewLoading 
} from "@/modules/meetings/ui/views/meeting-id-view";

import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
    params: Promise<{
        meetingId: string;
    }>;
};

const Page =async ({ params }: Props) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const { meetingId } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));
    //TODO: Prefetch `meetings.getTranscript`

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingIdViewLoading />}>
                <ErrorBoundary fallback={<MeetingIdViewError />}>
                    <MeetingIdView meetingId={meetingId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;

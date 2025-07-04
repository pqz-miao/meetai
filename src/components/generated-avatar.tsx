import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { generateAvatarUri } from "@/lib/avatar";

interface Props {
    seed: string;
    className?: string;
    variant: "botttsNeutral" | "initials";
};

export const GeneratedAvatar = ({
    seed,
    className,
    variant
}: Props) => {
    const avatar = generateAvatarUri({ seed, variant });

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar} alt="Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
};

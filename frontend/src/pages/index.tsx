import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import GradeList from "@/components/GradeList/GradeList";
import { IGradeService } from "@/services/GradeService/GradeService.service";

export interface IndexPageProps {
  gradeService: IGradeService;
}
export default function IndexPage(props: IndexPageProps) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    props.gradeService.getGrades().then((result) => {
      setGrades(result.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Track&nbsp;</span>
          <span className={title({ color: "violet" })}>your&nbsp;</span>
          <br />
          <span className={title()}>university progress effortlessly.</span>
          <div className={subtitle({ class: "mt-4" })}>
            Stay on top of your academic journey with our intuitive progress
            tracker.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Get Started
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>
        <GradeList grades={grades} />
      </section>
    </DefaultLayout>
  );
}

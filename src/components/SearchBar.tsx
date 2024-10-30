"use client";
import { useRouter } from "next/navigation";
import { useRef, type KeyboardEvent } from "react";

export const SearchComponent = ({ usedIn }: { usedIn: string }) => {
  const router = useRouter();

  const regionRef = useRef<HTMLSelectElement>(null);
  const riotIdRef = useRef<HTMLInputElement>(null);
  const riotTagRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const paramRegion = regionRef?.current?.value;
    const paramRiotId = riotIdRef?.current?.value;
    const paramRiotTag = riotTagRef?.current?.value;

    if (!paramRegion || !paramRiotId || !paramRiotTag) {
      alert("Field cannot be empty.");
    } else {
      router.push(`/summoner/${paramRegion}/${paramRiotId}-${paramRiotTag}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <fieldset className={`sumSearch sumSearch-${usedIn}`}>
      <label htmlFor="select-region" className="ssOne">
        <span>Region</span>
        <select id="select-region" ref={regionRef} defaultValue={""} onKeyDown={handleKeyDown}>
          <option value="" disabled>
            . . .
          </option>
          <option value="na">North America</option>
          <option value="euw">Europe West</option>
          <option value="eun">Europe Nordic &amp; East</option>
          <option value="kr">Korea</option>
          <option value="jp">Japan</option>
          <option value="oce">Oceania</option>
          <option value="br">Brazil</option>
          <option value="lan">LAN</option>
          <option value="las">LAS</option>
          <option value="ru">Russia</option>
          <option value="tr">Türkiye</option>
          <option value="sg">Singapore</option>
          <option value="ph">Phillippines</option>
          <option value="tw">Taiwan</option>
          <option value="vn">Vietnam</option>
          <option value="th">Thailand</option>
        </select>
      </label>
      <div className="ssTwo-Three">
        <label htmlFor="input-riotid" className="ssTwo">
          <span>Riot ID</span>
          <input id="input-riotid" type="text" placeholder="Riot ID..." ref={riotIdRef} onKeyDown={handleKeyDown} />
        </label>
        <label htmlFor="input-tag" className="ssThree">
          <span>Tag</span>
          <div className="rIdTag_inputContainer">
            #
            <input
              id="input-tag"
              type="text"
              placeholder="Tag..."
              ref={riotTagRef}
              maxLength={5}
              onKeyDown={handleKeyDown}
            />
          </div>
        </label>
      </div>
      <button type="submit" onClick={handleSearch}>
        Fetch
      </button>
    </fieldset>
  );
};

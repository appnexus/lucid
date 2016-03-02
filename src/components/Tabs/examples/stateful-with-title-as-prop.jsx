import React from 'react';
import Tabs from '../Tabs';
import { buildStatefulComponent } from '../../../util/state-management';

var StatefulTabs = buildStatefulComponent(Tabs);

export default React.createClass({
	render() {
		return (
			<div>
				<StatefulTabs>
					<StatefulTabs.Tab>
						<StatefulTabs.Title>Lisa</StatefulTabs.Title>
						The Lisa (Local Integrated Software Architecture) is a personal computer that
						was designed by Apple Computer, Inc. during the early 1980s. It was one of the
						first personal computer to offer a graphical user interface in a machine aimed
						at individual business users. Development of the Lisa began in 1978. The
						Lisa sold poorly, with only 100,000 units sold.
					</StatefulTabs.Tab>
					<StatefulTabs.Tab>
						<StatefulTabs.Title>Classic</StatefulTabs.Title>
						The Macintosh Classic is a personal computer manufactured by Apple
						Inc.. Introduced on October 15, 1990, it was the first Apple
						Macintosh to sell for less than US$1,000.[2] Production of the
						Classic was prompted by the success of the Macintosh Plus and the
						Macintosh SE. The system specifications of the Classic were very
						similar to its predecessors, with the same 9-inch (23 cm)
						monochrome CRT display, 512×342 pixel resolution, and 4 megabyte
						(MB) memory limit of the older Macintosh computers.[1][3] Apples
						decision to not update the Classic with newer technology such as a
						68010 CPU, higher RAM capacity or color display ensured
						compatibility with the Macs by-then healthy software base as well
						as enabled it to fit the lower price Apple intended for it.
						Nevertheless, the Classic featured several improvements over
						the aging Macintosh Plus, which it replaced as Apples low-end Mac
						computer. It was up to 25 percent faster than the Plus and included
						an Apple SuperDrive 3.5-inch (9 cm) floppy disk drive as standard.
					</StatefulTabs.Tab>
					<StatefulTabs.Tab>
						<StatefulTabs.Title>LC 500</StatefulTabs.Title>
						The Macintosh LC 500 series is a series of personal computers that
						were a part of Apple Computer's LC line of Macintosh computers. It
						was Apple's mid-1990s upper low end-range series, positioned below
						the Centris and Quadra but above the Classic II and Color Classic
						models. All of these computers were also sold under the Macintosh
						Performa brand, in some cases under slightly different model
						numbers. These computers all shared the same all-in-one desktop
						case that included a 14" CRT display, CD-ROM drive, and stereo
						speakers. Designed as a successor to the compact all-in-one
						Macintosh, the case was reminiscent of Apple's earlier Compact
						Macintosh series but considerably larger and bulkier, with a larger
						screen (compared to the Compact's 9- or 10-inch displays) and a
						bulging midsection to contain the larger electronics, in
						stark contrast to the compact Macs' slimmer designs.
					</StatefulTabs.Tab>
					<StatefulTabs.Tab>
						<StatefulTabs.Title>Power Macintosh G3</StatefulTabs.Title>
						The Power Macintosh G3, commonly called "beige G3s" or "platinum
						G3s" for the color of their cases, is a series of personal
						computers designed, manufactured, and sold by Apple Computer from
						November 1997 to January 1999. It was the first Macintosh to use
						the PowerPC G3 (PPC750) microprocessor, and replaced a number of
						earlier Power Macintosh models, in particular the 7300, 8600 and
						9600 models. It was succeeded by the Power Macintosh G3 (Blue and
						White), which kept the name but introduced a radically different
						design. The introduction of the Desktop and Minitower G3 models coincided
						with Apple starting to sell user-configurable Macs directly from
						its web site in an online store[1] Archived May 9, 1998, at the
						Wayback Machine., which was unusual for the time as Dell was the
						only other major manufacturer then doing this.
					</StatefulTabs.Tab>
				</StatefulTabs>
			</div>
		);
	}
});

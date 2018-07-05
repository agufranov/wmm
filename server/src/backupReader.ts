import { map } from 'lodash'
import { Database, OPEN_READONLY } from 'sqlite3'

export async function getText(): Promise<string[]> {
    return new Promise((resolve: (result: string[]) => void) => {
        // const searchPattern = path.join(
        //     process.env.HOME!,
        //     'Library/Application Support/MobileSync/Backup/**/3d0d7e5fb2ce288813306e4d4636395e047a3d28',
        // )
        // glob(searchPattern, (_: Error | null, files: string[]) => {
        //     console.log(files)
        // })

        // tslint:disable-next-line:max-line-length
        const dbPath = '/Users/agufranov/Library/Application Support/MobileSync/Backup/ce6dbfa6dd78de1d10a0b641702627e597d4de5b/3d/3d0d7e5fb2ce288813306e4d4636395e047a3d28'
        const db = new Database(dbPath, OPEN_READONLY, (__: Error | null) => {
            db.serialize(() => {
                db.all(
                    'SELECT text FROM message WHERE handle_id = 2',
                    (_: Error | null, rows: Array<{ text: string }>) => {
                        resolve(map(rows, 'text'))
                    },
                )
            })
        })
    })
}
